// Components/Notification/Notification.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationsAction,
  markNotificationAsReadAction,
  deleteNotificationAction,
  clearNotificationError,
} from "../../Redux/Notification/Action";
import { timeDifference } from "../../Config/Logic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notification } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [readNotifications, setReadNotifications] = useState(new Set());
  const [justMarkedAsRead, setJustMarkedAsRead] = useState(null);

  useEffect(() => {
    dispatch(getNotificationsAction(token));
  }, [token, dispatch]);

  useEffect(() => {
    const readIds = new Set(
      notification.notifications
        .filter((item) => item.isRead)
        .map((item) => item.id)
    );
    setReadNotifications(readIds);
  }, [notification.notifications]);

  useEffect(() => {
    if (justMarkedAsRead) {
      const timer = setTimeout(() => {
        setJustMarkedAsRead(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [justMarkedAsRead]);

  useEffect(() => {
    if (notification.error) {
      toast.error(notification.error);
      dispatch(clearNotificationError());
    }
  }, [notification.error, dispatch]);

  const handleMarkAsRead = async (notification) => {
    try {
      setLoading(true);
      await dispatch(markNotificationAsReadAction(notification.id));
      setReadNotifications((prev) => new Set([...prev, notification.id]));
      setJustMarkedAsRead(notification.id);
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      setLoading(true);
      await dispatch(deleteNotificationAction(notificationId));
      toast.success("Notification deleted successfully");
    } catch (error) {
      toast.error("Failed to delete notification");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToPost = (postId) => {
    if (postId) {
      navigate(`/p/${postId}`);
    }
  };

  const filterNotifications = () => {
    let filteredNotifications = [...notification.notifications];
    switch (activeTab) {
      case "unread":
        return filteredNotifications.filter(
          (item) => !readNotifications.has(item.id)
        );
      case "read":
        return filteredNotifications.filter((item) =>
          readNotifications.has(item.id)
        );
      default:
        return filteredNotifications;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="flex space-x-4 mb-4">
        {["all", "unread", "read"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filterNotifications().length === 0 ? (
          <p className="text-gray-500 text-center">No notifications found.</p>
        ) : (
          filterNotifications().map((item) => (
            <div
              key={item.id}
              className={`flex items-start space-x-3 p-4 rounded-lg shadow-sm border ${
                !readNotifications.has(item.id)
                  ? "bg-blue-50"
                  : justMarkedAsRead === item.id
                  ? "bg-green-50"
                  : "bg-white"
              }`}
            >
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={
                  item.user.userImage ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={item.user.username}
              />
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-bold">{item.user.username}</span>{" "}
                  {item.message}
                </p>
                <p className="text-xs text-gray-500">
                  {timeDifference(item.createdAt)}
                </p>
                <div className="flex space-x-2 mt-2">
                  {!readNotifications.has(item.id) && (
                    <button
                      onClick={() => handleMarkAsRead(item)}
                      disabled={loading}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  {item.postId && (
                    <button
                      onClick={() => handleNavigateToPost(item.postId)}
                      className="text-xs text-gray-500 hover:underline"
                    >
                      View Post
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
