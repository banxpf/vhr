package com.xpf.vhr.service;

import com.xpf.vhr.mapper.DepartmentMapper;
import com.xpf.vhr.model.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
	@Autowired
	DepartmentMapper departmentMapper;

	public List<Department> getAllDepartments() {
		return departmentMapper.getAllDepartmentByIds(-1);
	}

	public void addDep(Department dep) {
		dep.setEnabled(true);
		departmentMapper.addDep(dep);
	}

	public void deleteDepById(Department dep) {
		departmentMapper.deleteDepById(dep);
	}

	public List<Department> getAllDepartmentsWithChildren() {
		return departmentMapper.getAllDepartmentsWithChildren();
	}
}
