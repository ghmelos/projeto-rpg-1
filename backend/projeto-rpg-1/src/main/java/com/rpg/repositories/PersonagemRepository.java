package com.rpg.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rpg.entities.Personagem;

public interface PersonagemRepository extends JpaRepository <Personagem, Long>{

}
