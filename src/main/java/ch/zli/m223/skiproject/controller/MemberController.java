package ch.zli.m223.skiproject.controller;

import ch.zli.m223.skiproject.domain.Member;
import ch.zli.m223.skiproject.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {
    private MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Member> getAllMember() {
        return memberService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Member createMember(@Valid @RequestBody Member member) {
        return memberService.createMember(member);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember(@PathVariable long id) {
        memberService.deleteMember(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Member updateMember(@Valid @RequestBody Member member) {
        return memberService.updateMember(member);
    }
}