package com.xpf.vhr.service;

import com.xpf.vhr.mapper.EmployeeMapper;
import com.xpf.vhr.model.Employee;
import com.xpf.vhr.model.RespEmpBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class EmployeeService {

	@Autowired
	EmployeeMapper employeeMapper;
	@Autowired
	RabbitTemplate rabbitTemplate;
	public static final Logger LOGGER = LoggerFactory.getLogger(EmployeeService.class);
	SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
	SimpleDateFormat monthFormat = new SimpleDateFormat("MM");
	DecimalFormat decimalFormat = new DecimalFormat("##.00");


	public RespEmpBean getEmployeeByPage(Integer page, Integer size, Employee emp, Date[] beginDateScope) {
		if (page != null && size != null) {
			page = (page - 1) * size;
		}
		Integer len = employeeMapper.getTotal(emp, beginDateScope);
		System.out.println(emp);
		List<Employee> e = employeeMapper.getEmployeeByPage(page, size, emp, beginDateScope);
		RespEmpBean respEmpBean = new RespEmpBean();
		respEmpBean.setTotal(len);
		respEmpBean.setData(e);
		return respEmpBean;
	}

	public Integer addEmployee(Employee employee) {
		Date beginContract = employee.getBeginContract();
		Date endContract = employee.getEndContract();
		double month = (Double.parseDouble(yearFormat.format(endContract)) - Double.parseDouble(yearFormat.format(beginContract))) * 12
				+ (Double.parseDouble(monthFormat.format(endContract)) - Double.parseDouble(monthFormat.format(beginContract)));
		employee.setContractTerm(Double.parseDouble(decimalFormat.format(month / 12)));
		int result = employeeMapper.insertSelective(employee);
		if (result == 1) {
			Employee emp = employeeMapper.getEmployeeById(employee.getId());
			LOGGER.info(emp.toString());
			rabbitTemplate.convertAndSend("xpf.mail", emp);
		}

		return result;
	}

	public Integer getMaxWorkID() {
		return employeeMapper.getMaxWorkID();
	}

	public Integer deleteEmployeeById(Integer id) {
		return employeeMapper.deleteByPrimaryKey(id);
	}

	public Integer editEmployee(Employee employee) {

		return employeeMapper.updateByPrimaryKeySelective(employee);
	}

	public Integer deleteEmployeeByIds(Integer[] ids) {
		return employeeMapper.deleteEmployeeByIds(ids);
	}

	public boolean addEmps(List<Employee> lists) {
		return employeeMapper.addEmps(lists) == lists.size();
	}

	public RespEmpBean getEmployeeByPageWithSalary(Integer page, Integer size) {
		if (page != null && size != null) {
			page = (page - 1) * size;
		}
		List<Employee> emps =  employeeMapper.getEmployeeByPageWithSalary(page, size);
		RespEmpBean respEmpBean = new RespEmpBean();
		respEmpBean.setData(emps);
		respEmpBean.setTotal(employeeMapper.getTotal(null,null));
		return respEmpBean;
	}

	public Integer updateEmployeeSalaryById(Integer eid, Integer sid) {

		return employeeMapper.updateEmployeeSalaryById(eid,sid);
	}
}
