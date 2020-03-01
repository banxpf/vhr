package com.xpf.vhr.controller;

import com.xpf.vhr.model.RespBean;
import com.xpf.vhr.model.RespEmpBean;
import com.xpf.vhr.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/salary/sobcfg")
public class SobConfigController {
	@Autowired
	EmployeeService employeeService;

	@GetMapping("/")
	public RespEmpBean getEmployeeByPageWithSalary(@RequestParam(defaultValue = "1") Integer page,
												   @RequestParam(defaultValue = "10") Integer size) {
		return employeeService.getEmployeeByPageWithSalary(page, size);
	}

	@PutMapping("/")
	public RespBean updateEmployeeSalaryById(Integer eid, Integer sid) {
		Integer result = employeeService.updateEmployeeSalaryById(eid, sid);
		if (result == 1 || result == 2) {
			return RespBean.ok("更新成功！");
		}
		return RespBean.error("更新失败！");
	}
}
