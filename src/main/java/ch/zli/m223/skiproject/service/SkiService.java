package ch.zli.m223.skiproject.service;

import ch.zli.m223.skiproject.domain.Ski;
import ch.zli.m223.skiproject.repository.SkiRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkiService {
    private SkiRepository skiRepository;

    public SkiService(SkiRepository skiRepository) {
        this.skiRepository = skiRepository;
    }

    public Ski createSki(Ski ski) {
        return skiRepository.saveAndFlush(ski);
    }

    public List<Ski> findAll() {
        return skiRepository.findAll();
    }

    public void deleteSki(long id) { skiRepository.deleteById(id); }
    
    public Ski updateSki(Ski ski) {
        return skiRepository.save(ski);
    }
}
