package com.blog.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private Long id;
    private Long articleId;
    private String name;
    private String email;
    private String content;
    private String createdAt;
}
