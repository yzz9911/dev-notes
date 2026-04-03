package com.blog.controller;

import com.blog.dto.CommentDTO;
import com.blog.entity.Comment;
import com.blog.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/articles/{articleId}/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getArticleComments(@PathVariable Long articleId) {
        List<Comment> comments = commentService.getArticleComments(articleId);
        List<CommentDTO> dtos = comments.stream()
                .map(c -> modelMapper.map(c, CommentDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@PathVariable Long articleId, @RequestBody Comment comment) {
        comment.setArticleId(articleId);
        Comment created = commentService.createComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(created, CommentDTO.class));
    }

    @DeleteMapping("/{commentId}")
    @PreAuthorize("hasRole('AUTHOR')")
    public ResponseEntity<Void> deleteComment(@PathVariable Long articleId, @PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
