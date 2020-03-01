package com.xpf.vhr.mapper;

import com.xpf.vhr.model.Menu;

import java.util.List;

public interface MenuMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Menu record);

    int insertSelective(Menu record);

    Menu selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Menu record);

    int updateByPrimaryKey(Menu record);

	List<Menu> getMenusByHrId(Integer hrid);

	List<Menu> getAllMenusWithRoles();

	List<Menu> getAllMenus();

	List<Integer> getMidsByRid(Integer rid);
}