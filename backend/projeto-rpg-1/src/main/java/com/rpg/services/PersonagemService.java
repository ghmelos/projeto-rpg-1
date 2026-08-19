package com.rpg.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rpg.entities.Personagem;
import com.rpg.repositories.PersonagemRepository;

@Service
public class PersonagemService {

	@Autowired
	private PersonagemRepository repository;
	
	public List<Personagem> listarTodos(){
		return repository.findAll();
	}
	
	public Optional<Personagem> buscarPorId(Long id) {
		return repository.findById(id);
	}
	
	public Personagem salvar(Personagem personagem) {
		return repository.save(personagem);
	}
	
	public Personagem atualizar(Long id, Personagem personagemAlterado) {
		Optional<Personagem> existente = buscarPorId(id);
		
		if(existente.isPresent()) {
			
			Personagem atualizado = existente.get();
			
		atualizado.setNome(personagemAlterado.getNome());
		atualizado.setClasse(personagemAlterado.getClasse());
		atualizado.setNivel(personagemAlterado.getNivel());
		atualizado.setAtributo(personagemAlterado.getAtributo());
		
		return repository.save(atualizado);
		
		}
		
		return null;
	}
	
	public void deletar(Long id) {
		repository.deleteById(id);
	}
	
}

