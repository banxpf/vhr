package com.xpf.vhr.service;

import com.xpf.vhr.mapper.MenuMapper;
import com.xpf.vhr.mapper.MenuRoleMapper;
import com.xpf.vhr.model.Hr;
import com.xpf.vhr.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MenuService {
	@Autowired
	MenuMapper menuMapper;
	@Autowired
	MenuRoleMapper menuRoleMapper;

	public List<Menu> getMenusByHrId() {
		return menuMapper.getMenusByHrId(((Hr) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
	}

	public List<Menu> getAllMenusWithRoles() {
		return menuMapper.getAllMenusWithRoles();
	}


	public List<Menu> getAllMenus() {
		return menuMapper.getAllMenus();
	}


	public List<Integer> getMidsByRid(Integer rid) {
		return menuMapper.getMidsByRid(rid);
	}

	@Transactional
	public boolean updateMenuRole(Integer rid, Integer[] mids) {
		menuRoleMapper.deleteById(rid);
		if(mids == null || mids.length == 0) {
			return true;
		}
		Integer result = menuRoleMapper.insertRecord(rid, mids);
		return result == mids.length;
	}
}
