package com.blog.repository;

import com.blog.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByTitleContainingIgnoreCase(String keyword);
    List<Article> findByCategoryOrderByCreatedAtDesc(String category);
    List<Article> findAllByOrderByCreatedAtDesc();
}
