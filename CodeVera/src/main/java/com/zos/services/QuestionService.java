package com.zos.services;

import com.zos.dto.QuestionRequest;
import com.zos.model.Question;
import com.zos.model.Tag;
import com.zos.model.User;
import com.zos.repository.QuestionRepository;
import com.zos.repository.TagRepository;
import com.zos.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public Question createQuestion(Question question) {
        question.setCreatedAt(LocalDateTime.now());
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public Question updateQuestion(Long id, Question updated) {
        return questionRepository.findById(id).map(q -> {
            q.setTitle(updated.getTitle());
            q.setContent(updated.getContent());
            return questionRepository.save(q);
        }).orElseThrow(() -> new RuntimeException("Question not found"));
    }
}
