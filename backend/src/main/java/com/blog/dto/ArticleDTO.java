package com.blog.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleDTO {
    private Long id;
    private String title;
    private String content;
    private String excerpt;
    private String category;
    private String author;
    private String createdAt;
    private String updatedAt;
}
