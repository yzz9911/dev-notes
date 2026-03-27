package com.blog.controller;

import com.blog.dto.LoginRequest;
import com.blog.dto.LoginResponse;
import com.blog.dto.UserDTO;
import com.blog.entity.User;
import com.blog.service.CustomUserDetailsService;
import com.blog.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
//            System.out.println("hit login");
//
//            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
//
//            System.out.println("输入密码: " + loginRequest.getPassword());
//            System.out.println("数据库密码: " + userDetails.getPassword());
//
//            System.out.println("match结果: " +
//                    passwordEncoder.matches(
//                            loginRequest.getPassword(),
//                            userDetails.getPassword()
//                    )
//            );

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtService.generateToken(authentication);

            User user = (User) authentication.getPrincipal();
            UserDTO userDTO = modelMapper.map(user, UserDTO.class);

            return ResponseEntity.ok(LoginResponse.builder()
                    .token(token)
                    .user(userDTO)
                    .build());

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(modelMapper.map(user, UserDTO.class));
    }
}
