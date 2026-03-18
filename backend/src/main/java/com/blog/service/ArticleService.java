package com.blog.service;

import com.blog.entity.Article;
import com.blog.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    public List<Article> getAllArticles() {
        return articleRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }

    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    public Article updateArticle(Long id, Article articleDetails) {
        return articleRepository.findById(id).map(article -> {
            article.setTitle(articleDetails.getTitle());
            article.setContent(articleDetails.getContent());
            article.setExcerpt(articleDetails.getExcerpt());
            article.setCategory(articleDetails.getCategory());
            return articleRepository.save(article);
        }).orElseThrow();
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

    public List<Article> searchArticles(String keyword) {
        return articleRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
