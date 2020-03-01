package com.xpf.vhr.controller;

import com.xpf.vhr.model.*;
import com.xpf.vhr.service.*;
import com.xpf.vhr.utils.PoiUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/employee/basic")
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	@Autowired
	NationService nationService;
	@Autowired
	PoliticsstatusService politicsstatusService;
	@Autowired
	JobLevelService jobLevelService;
	@Autowired
	PositionService positionService;
	@Autowired
	DepartmentService departmentService;

	@GetMapping("/")
	public RespEmpBean getEmployeeByPage(@RequestParam(defaultValue = "1") Integer page,
										 @RequestParam(defaultValue = "10") Integer size, Employee emp, Date[] beginDateScope) {
		return employeeService.getEmployeeByPage(page, size, emp, beginDateScope);
	}

	@PostMapping("/")
	public RespBean addEmployee(@RequestBody Employee employee) {
		if (employeeService.addEmployee(employee) == 1) {
			return RespBean.ok("添加成功!");
		}
		return RespBean.error("添加失败！");
	}
	@PutMapping("/")
	public RespBean editEmployee(@RequestBody Employee employee) {
		if (employeeService.editEmployee(employee) == 1) {
			return RespBean.ok("更新成功!");
		}
		return RespBean.error("更新失败！");
	}
	@DeleteMapping("/{id}")
	public RespBean deleteEmployeeById(@PathVariable Integer id) {
		if (employeeService.deleteEmployeeById(id) == 1) {
			return RespBean.ok("删除成功!");
		}
		return RespBean.error("删除失败！");
	}
	@DeleteMapping("/many")
	public RespBean deleteEmployeeByIds(Integer[] ids) {
		if (employeeService.deleteEmployeeByIds(ids) == ids.length) {
			return RespBean.ok("删除成功！");
		}
		return RespBean.error("删除失败！");
	}

	@GetMapping("/nations")
	public List<Nation> getAllNations() {
		return nationService.getAllNations();
	}
	@GetMapping("/politicsstatus")
	public List<Politicsstatus> getAllPoliticsstatus() {
		return politicsstatusService.getAllPoliticsstatus();
	}
	@GetMapping("/jobLevels")
	public List<JobLevel> getAllJobLevel() {
		return jobLevelService.getAllJobLevels();
	}
	@GetMapping("/positions")
	public List<Position> getAllPosition() {
		return positionService.getAllPositions();
	}
	@GetMapping("/workID")
	public RespBean getMaxWorkID(){
		return RespBean.build().setStatus(200)
				.setObj(String.format("%08d",employeeService.getMaxWorkID() + 1));
	}
	
	@GetMapping("/export")
	public ResponseEntity<byte[]> exportData() {
		List<Employee> list = (List<Employee>) employeeService.getEmployeeByPage(null, null, null,null).getData();
		return PoiUtils.export2Employee(list);
	}
	@PostMapping("/import")
	public RespBean importData(MultipartFile file) throws IOException {
		List<Employee> lists = PoiUtils.import2Employee(file, nationService.getAllNations(), politicsstatusService.getAllPoliticsstatus(),
				departmentService.getAllDepartmentsWithChildren(), positionService.getAllPositions(),jobLevelService.getAllJobLevels());
		if (employeeService.addEmps(lists)) {
			return RespBean.ok("上传成功");
		}
		return RespBean.error("上传失败");

	}

}
