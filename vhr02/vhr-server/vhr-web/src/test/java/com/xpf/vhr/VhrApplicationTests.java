package com.xpf.vhr;

import com.xpf.vhr.model.JobLevel;
import com.xpf.vhr.service.JobLevelService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@SpringBootTest
class VhrApplicationTests {

	@Autowired
	JobLevelService jobLevelService;
	@Test
	void contextLoads() {
		LocalDate ld1 = LocalDate.now();
		LocalDate ld2 = LocalDate.of(2016,04,06);
		Period pe = Period.between(ld1, ld2);
		System.out.println(pe.getYears());
		System.out.println(pe.getMonths());
		System.out.println(pe.getDays());
	}

	@Test
	void test1() {
//		List<JobLevel> allJobLevels = jobLevelService.getAllJobLevels();
//		System.out.println("执行了");
//		for(JobLevel a : allJobLevels) {
//			System.out.println(a);
//		}
		System.out.println("123");
	}
}
