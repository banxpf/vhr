package com.xpf.vhr.controller;

import com.xpf.vhr.model.RespBean;
import com.xpf.vhr.model.Salary;
import com.xpf.vhr.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salary/sob")
public class SalaryController {
	@Autowired
	SalaryService salaryService;

	@GetMapping("/")
	public List<Salary> getAllSalaries() {
		return salaryService.getAllSalaries();
	}
	@PostMapping("/")
	public RespBean addSalary(@RequestBody Salary salary) {
		if (salaryService.addSalary(salary) == 1) {
			return RespBean.ok("添加成功");
		}
		return RespBean.error("添加失败");

	}
	@PutMapping("/")
	public RespBean updateSalary(@RequestBody Salary salary) {
		if (salaryService.updateSalary(salary) == 1) {
			return RespBean.ok("修改成功");
		}
		return RespBean.error("修改失败");

	}
	@DeleteMapping("/{id}")
	public RespBean deleteSalary(@PathVariable Integer id) {
		if (salaryService.deleteSalary(id) == 1) {
			return RespBean.ok("删除成功");
		}
		return RespBean.error("删除失败");

	}

}
