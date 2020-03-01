package com.xpf.vhr.mapper;

import com.xpf.vhr.model.Employee;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface EmployeeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Employee record);

    int insertSelective(Employee record);

    Employee selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Employee record);

    int updateByPrimaryKey(Employee record);

	Integer getTotal( @Param("emp") Employee emp, @Param("beginDateScope") Date[] beginDateScope);

    List<Employee> getEmployeeByPage(@Param("page") Integer page, @Param("size") Integer size,
									 @Param("emp") Employee emp, @Param("beginDateScope") Date[] beginDateScope);

	Integer getMaxWorkID();

	Integer deleteEmployeeByIds(@Param("ids") Integer[] ids);

	Integer addEmps(@Param("lists") List<Employee> lists);

	Employee getEmployeeById(Integer id);

	List<Employee> getEmployeeByPageWithSalary(@Param("page")Integer page, @Param("size")Integer size);

	Integer updateEmployeeSalaryById(@Param("eid") Integer eid, @Param("sid") Integer sid);
}