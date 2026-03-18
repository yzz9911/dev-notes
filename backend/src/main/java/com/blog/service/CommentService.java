package com.blog.service;

import com.blog.entity.Comment;
import com.blog.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<Comment> getArticleComments(Long articleId) {
        return commentRepository.findByArticleIdAndVerifiedOrderByCreatedAtDesc(articleId, true);
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public Comment verifyComment(Long id, String token) {
        return commentRepository.findById(id).map(comment -> {
            if (token.equals(comment.getVerificationToken())) {
                comment.setVerified(true);
                return commentRepository.save(comment);
            }
            return comment;
        }).orElseThrow();
    }
}
