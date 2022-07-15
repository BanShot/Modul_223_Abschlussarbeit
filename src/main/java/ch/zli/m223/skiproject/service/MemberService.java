package ch.zli.m223.skiproject.service;

import ch.zli.m223.skiproject.domain.Member;
import ch.zli.m223.skiproject.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Nicola Werlen
 * @version 15.07.2022
 * Modul: x
 */
@Service
public class MemberService {

    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        return memberRepository.saveAndFlush(member);
    }

    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    public void deleteMember(long id) { memberRepository.deleteById(id); }

    public Member updateMember(Member member) {
        return memberRepository.save(member);
    }
}

