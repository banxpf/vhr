package com.xpf.vhr.mapper;

import com.xpf.vhr.model.Hr;
import com.xpf.vhr.model.Role;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HrMapper {

	List<Hr> getAllHrs(@Param("hrid") Integer hrid, @Param("keyword") String keyword);

	int deleteByPrimaryKey(Integer id);

    int insert(Hr record);

    int insertSelective(Hr record);

    Hr selectByPrimaryKey(Integer id);

    Integer updateByPrimaryKeySelective(Hr record);

    int updateByPrimaryKey(Hr record);

	Hr loadUserByUsername(String username);

	List<Role> getHrRolesById(Integer id);

	List<Hr> getAllHrsExceptCurrentHr(Integer id);
}