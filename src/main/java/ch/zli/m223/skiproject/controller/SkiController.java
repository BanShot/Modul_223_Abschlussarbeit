package ch.zli.m223.skiproject.controller;

import ch.zli.m223.skiproject.domain.Ski;
import ch.zli.m223.skiproject.service.SkiService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/skis")
public class SkiController {
    private SkiService skiService;

    public SkiController(SkiService skiService) {
        this.skiService = skiService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Ski> getAllSkis() {
        return skiService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ski createSki(@Valid @RequestBody Ski ski) {
        return skiService.createSki(ski);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSki(@PathVariable long id) {
        skiService.deleteSki(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Ski updateSki(@Valid @RequestBody Ski ski) {
        return skiService.updateSki(ski);
    }
}