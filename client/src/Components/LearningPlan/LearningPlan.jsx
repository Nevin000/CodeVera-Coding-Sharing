import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createLearningPlan, 
  getLearningPlans, 
  updateLearningPlan, 
  deleteLearningPlan,
  addTopicToPlan,
  updateTopic,
  deleteTopic,
  addResourceToTopic,
  updateResource,
  deleteResource
} from '../../Redux/LearningPlan/Action';
import { 
  Button, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  Checkbox, 
  Tag, 
  Space, 
  message, 
  Spin,
  Alert,
  Divider
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  LinkOutlined,
  FileAddOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import "./LearningPlan.css";

const { TextArea } = Input;

const LearningPlan = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { learningPlan } = useSelector((store) => store);
  const [planForm] = Form.useForm();
  const [topicForm] = Form.useForm();
  const [resourceForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planModal, setPlanModal] = useState({
    visible: false,
    mode: 'create',
    currentPlan: null
  });
  const [topicModal, setTopicModal] = useState({
    visible: false,
    mode: 'create',
    currentTopic: null,
    planId: null
  });
  const [resourceModal, setResourceModal] = useState({
    visible: false,
    mode: 'create',
    currentResource: null,
    topicId: null
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (isMounted) setLoading(true);
        await dispatch(getLearningPlans(token));
      } catch (err) {
        if (isMounted) setError("Failed to load learning plans. Please try again.");
        console.error("Error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (token) fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [dispatch, token]);

  const handleCreatePlan = async (values) => {
    try {
      await dispatch(createLearningPlan({
        jwt: token,
        planData: values
      }));
      setPlanModal({...planModal, visible: false});
      planForm.resetFields();
      message.success('Learning plan created successfully');
    } catch (err) {
      message.error(err.message || 'Failed to create learning plan');
    }
  };

  const handleUpdatePlan = async (values) => {
    try {
      await dispatch(updateLearningPlan({
        jwt: token,
        planId: planModal.currentPlan.id,
        planData: values
      }));
      setPlanModal({...planModal, visible: false});
      planForm.resetFields();
      message.success('Learning plan updated successfully');
    } catch (err) {
      message.error(err.message || 'Failed to update learning plan');
    }
  };

  const handleDeletePlan = (planId) => {
    Modal.confirm({
      title: 'Delete Learning Plan',
      content: 'Are you sure you want to delete this learning plan?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          await dispatch(deleteLearningPlan({
            jwt: token,
            planId
          }));
          message.success('Learning plan deleted successfully');
        } catch (err) {
          message.error(err.message || 'Failed to delete learning plan');
        }
      }
    });
  };

  const handleCreateTopic = async (values) => {
    try {
      await dispatch(addTopicToPlan({
        jwt: token,
        planId: topicModal.planId,
        topicData: {
          ...values,
          targetCompletionDate: values.targetCompletionDate?.format('YYYY-MM-DD') || null
        }
      }));
      setTopicModal({...topicModal, visible: false});
      topicForm.resetFields();
      message.success('Topic added successfully');
    } catch (err) {
      message.error(err.message || 'Failed to add topic');
    }
  };

  const handleUpdateTopic = async (values) => {
    try {
      await dispatch(updateTopic({
        jwt: token,
        topicId: topicModal.currentTopic.id,
        topicData: {
          ...values,
          targetCompletionDate: values.targetCompletionDate?.format('YYYY-MM-DD') || null
        }
      }));
      setTopicModal({...topicModal, visible: false});
      topicForm.resetFields();
      message.success('Topic updated successfully');
    } catch (err) {
      message.error(err.message || 'Failed to update topic');
    }
  };

  const handleDeleteTopic = (topicId) => {
    Modal.confirm({
      title: 'Delete Topic',
      content: 'Are you sure you want to delete this topic?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          await dispatch(deleteTopic({
            jwt: token,
            topicId
          }));
          message.success('Topic deleted successfully');
        } catch (err) {
          message.error(err.message || 'Failed to delete topic');
        }
      }
    });
  };

  const handleCreateResource = async (values) => {
    try {
      await dispatch(addResourceToTopic({
        jwt: token,
        topicId: resourceModal.topicId,
        resourceData: values
      }));
      setResourceModal({...resourceModal, visible: false});
      resourceForm.resetFields();
      message.success('Resource added successfully');
    } catch (err) {
      message.error(err.message || 'Failed to add resource');
    }
  };

  const handleUpdateResource = async (values) => {
    try {
      await dispatch(updateResource({
        jwt: token,
        resourceId: resourceModal.currentResource.id,
        resourceData: values
      }));
      setResourceModal({...resourceModal, visible: false});
      resourceForm.resetFields();
      message.success('Resource updated successfully');
    } catch (err) {
      message.error(err.message || 'Failed to update resource');
    }
  };

  const handleDeleteResource = (resourceId) => {
    Modal.confirm({
      title: 'Delete Resource',
      content: 'Are you sure you want to delete this resource?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          await dispatch(deleteResource({
            jwt: token,
            resourceId
          }));
          message.success('Resource deleted successfully');
        } catch (err) {
          message.error(err.message || 'Failed to delete resource');
        }
      }
    });
  };

  const showPlanModal = (mode = 'create', plan = null) => {
    setPlanModal({
      visible: true,
      mode,
      currentPlan: plan
    });
    if (mode === 'edit') {
      planForm.setFieldsValue({
        title: plan.title,
        description: plan.description
      });
    }
  };

  const showTopicModal = (mode = 'create', topic = null, planId = null) => {
    setTopicModal({
      visible: true,
      mode,
      currentTopic: topic,
      planId
    });
    if (mode === 'edit') {
      topicForm.setFieldsValue({
        title: topic.title,
        description: topic.description,
        completed: topic.completed,
        targetCompletionDate: topic.targetCompletionDate ? moment(topic.targetCompletionDate) : null
      });
    }
  };

  const showResourceModal = (mode = 'create', resource = null, topicId = null) => {
    setResourceModal({
      visible: true,
      mode,
      currentResource: resource,
      topicId
    });
    if (mode === 'edit') {
      resourceForm.setFieldsValue({
        url: resource.url,
        description: resource.description
      });
    }
  };

  const getCompletionPercentage = (topics) => {
    if (!topics || topics.length === 0) return 0;
    const completed = topics.filter(t => t.completed).length;
    return Math.round((completed / topics.length) * 100);
  };

  if (error) {
    return (
      <div className="learning-plan-container">
        <div className="empty-state">
          <Alert message="Error" description={error} type="error" showIcon />
          <Button 
            className="primary-button mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="learning-plan-container">
        <div className="empty-state">
          <Spin size="large" />
          <p className="text-gray-500 mt-4">Loading your learning plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-plan-container">
      <div className="plan-header">
        <h1 className="header-title">
          <BookOutlined style={{ color: '#7c3aed' }} /> Learning Plans
        </h1>
        <Button
          className="primary-button"
          icon={<PlusOutlined />}
          onClick={() => showPlanModal()}
        >
          New Learning Plans
        </Button>
      </div>

      {learningPlan.plans?.length === 0 ? (
        <div className="empty-state">
          <FileAddOutlined className="empty-state-icon" style={{ fontSize: '3rem', color: '#7c3aed' }} />
          <p className="text-gray-500 text-lg mb-4">No learning plans created yet</p>
          <Button
            className="primary-button"
            onClick={() => showPlanModal()}
          >
            Create First Plan

          </Button>
        </div>
      ) : (
        <div className="plan-grid">
          {learningPlan.plans?.map((plan) => (
            <div key={plan.id} className="plan-card">
              <div className="card-header">
                <div className="flex items-center gap-3">
                  <CheckCircleOutlined 
                    style={{ 
                      fontSize: '1.5rem', 
                      color: getCompletionPercentage(plan.topics) === 100 ? '#7c3aed' : '#e0e0e0' 
                    }} 
                  />
                  <h3 className="plan-title">{plan.title}</h3>
                </div>
                <Space>
                  <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    onClick={() => showTopicModal('create', null, plan.id)}
                  />
                  <Button
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => showPlanModal('edit', plan)}
                  />
                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleDeletePlan(plan.id)}
                  />
                </Space>
              </div>

              <div className="card-content">
                {plan.description && (
                  <p className="plan-description">{plan.description}</p>
                )}

                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${getCompletionPercentage(plan.topics)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">
                      {getCompletionPercentage(plan.topics)}% Complete
                    </span>
                    <span className="text-gray-600">
                      {plan.topics?.filter(t => t.completed).length} of {plan.topics?.length} topics
                    </span>
                  </div>
                </div>

                <Divider className="custom-divider" />

                <div className="topic-section">
                  <div className="section-header">
                    <h4 className="section-title">Topics</h4>
                    <Button
                      className="secondary-button"
                      icon={<PlusOutlined />}
                      onClick={() => showTopicModal('create', null, plan.id)}
                    >
                      Add Topic
                    </Button>
                  </div>

                  {plan.topics?.length > 0 ? (
                    <div className="topic-list">
                      {plan.topics.map((topic) => (
                        <div key={topic.id} className="topic-item">
                          <div className="topic-main">
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={topic.completed}
                                onChange={(e) => dispatch(updateTopic({
                                  jwt: token,
                                  topicId: topic.id,
                                  topicData: {
                                    ...topic,
                                    completed: e.target.checked
                                  }
                                }))}
                              />
                              <div className="topic-content">
                                <h4 className={`topic-title ${topic.completed ? 'completed' : ''}`}>
                                  {topic.title}
                                </h4>
                                {topic.description && (
                                  <p className="topic-description">{topic.description}</p>
                                )}
                              </div>
                            </div>
                            <div className="topic-actions">
                              <Button
                                size="small"
                                icon={<EditOutlined />}
                                onClick={() => showTopicModal('edit', topic, plan.id)}
                              />
                              <Button
                                size="small"
                                icon={<DeleteOutlined />}
                                danger
                                onClick={() => handleDeleteTopic(topic.id)}
                              />
                            </div>
                          </div>

                          <div className="topic-meta">
                            {topic.targetCompletionDate && (
                              <Tag icon={<CalendarOutlined />} className="status-tag tag-purple">
                                {new Date(topic.targetCompletionDate).toLocaleDateString()}
                              </Tag>
                            )}
                            {!topic.completed && new Date(topic.targetCompletionDate) < new Date() && (
                              <Tag className="status-tag tag-red">Overdue</Tag>
                            )}
                          </div>

                          {topic.resources?.length > 0 && (
                            <div className="resource-list">
                              {topic.resources.map((resource) => (
                                <div key={resource.id} className="resource-item">
                                  <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                  >
                                    <LinkOutlined className="mr-2" />
                                    {resource.description || resource.url}
                                  </a>
                                  <Space>
                                    <Button
                                      size="small"
                                      icon={<EditOutlined />}
                                      onClick={() => showResourceModal('edit', resource, topic.id)}
                                    />
                                    <Button
                                      size="small"
                                      icon={<DeleteOutlined />}
                                      danger
                                      onClick={() => handleDeleteResource(resource.id)}
                                    />
                                  </Space>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state-small">
                      <p className="text-gray-500">No topics added yet</p>
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={() => showTopicModal('create', null, plan.id)}
                      >
                        Add First Topic
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Plan Modal */}
      <Modal
        title={planModal.mode === 'create' ? 'New Learning Path' : 'Edit Learning Path'}
        visible={planModal.visible}
        onCancel={() => setPlanModal({...planModal, visible: false})}
        onOk={() => planForm.submit()}
        destroyOnClose
        className="modal-form"
        footer={[
          <Button key="back" onClick={() => setPlanModal({...planModal, visible: false})}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => planForm.submit()}>
            {planModal.mode === 'create' ? 'Create' : 'Update'}
          </Button>,
        ]}
      >
        <Form 
          form={planForm} 
          onFinish={planModal.mode === 'create' ? handleCreatePlan : handleUpdatePlan}
          layout="vertical"
        >
          <Form.Item 
            name="title" 
            label="Plan Title"
            rules={[
              { required: true, message: 'Please input the plan title!' },
              { max: 100, message: 'Title must be less than 100 characters' }
            ]}
          >
            <Input placeholder="Enter plan title" />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description"
            rules={[{ max: 500, message: 'Description must be less than 500 characters' }]}
          >
            <TextArea rows={4} placeholder="Describe your learning goals" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Topic Modal */}
      <Modal
        title={topicModal.mode === 'create' ? 'New Topic' : 'Edit Topic'}
        visible={topicModal.visible}
        onCancel={() => setTopicModal({...topicModal, visible: false})}
        onOk={() => topicForm.submit()}
        destroyOnClose
        className="modal-form"
        footer={[
          <Button key="back" onClick={() => setTopicModal({...topicModal, visible: false})}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => topicForm.submit()}>
            {topicModal.mode === 'create' ? 'Create' : 'Update'}
          </Button>,
        ]}
      >
        <Form 
          form={topicForm} 
          onFinish={topicModal.mode === 'create' ? handleCreateTopic : handleUpdateTopic}
          layout="vertical"
        >
          <Form.Item 
            name="title" 
            label="Topic Title"
            rules={[
              { required: true, message: 'Please input the topic title!' },
              { max: 100, message: 'Title must be less than 100 characters' }
            ]}
          >
            <Input placeholder="Enter topic title" />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description"
            rules={[{ max: 500, message: 'Description must be less than 500 characters' }]}
          >
            <TextArea rows={3} placeholder="Describe the topic content" />
          </Form.Item>
          <Form.Item name="targetCompletionDate" label="Target Date">
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder="Select target date"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
          <Form.Item name="completed" valuePropName="checked">
            <Checkbox>Mark as completed</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      {/* Resource Modal */}
      <Modal
        title={resourceModal.mode === 'create' ? 'New Resource' : 'Edit Resource'}
        visible={resourceModal.visible}
        onCancel={() => setResourceModal({...resourceModal, visible: false})}
        onOk={() => resourceForm.submit()}
        destroyOnClose
        className="modal-form"
        footer={[
          <Button key="back" onClick={() => setResourceModal({...resourceModal, visible: false})}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => resourceForm.submit()}>
            {resourceModal.mode === 'create' ? 'Add' : 'Update'}
          </Button>,
        ]}
      >
        <Form 
          form={resourceForm} 
          onFinish={resourceModal.mode === 'create' ? handleCreateResource : handleUpdateResource}
          layout="vertical"
        >
          <Form.Item 
            name="url" 
            label="Resource URL"
            rules={[
              { required: true, message: 'Please input the resource URL!' },
              { type: 'url', message: 'Please enter a valid URL!' }
            ]}
          >
            <Input 
              prefix={<LinkOutlined />} 
              placeholder="https://example.com/resource" 
            />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description (Optional)"
            rules={[{ max: 200, message: 'Description must be less than 200 characters' }]}
          >
            <Input placeholder="Brief description of the resource" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LearningPlan;