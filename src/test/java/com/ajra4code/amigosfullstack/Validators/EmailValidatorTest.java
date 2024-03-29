package com.ajra4code.amigosfullstack.Validators;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Test Email validation in Class EmailValidator")
class EmailValidatorTest {

    EmailValidator underTest;
    @BeforeEach
    public void beforeEachTestMethod() {
        underTest = new EmailValidator();
    }

    @Test
    @DisplayName("Test hello@gmail.com")
    public void itShouldValidateCorrectEmail() {

        assertThat(underTest.test("Hello@gmail.com")).isTrue();

    }


    @Test
    @DisplayName("Test hello@gmailcom")
    public void itShouldValidateInCorrectEmailWithoutTheDot() {

        assertThat(underTest.test("Hello@gmailcom")).isFalse();
    }



}