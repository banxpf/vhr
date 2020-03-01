package com.xpf.vhr.service;

import com.xpf.vhr.mapper.HrMapper;
import com.xpf.vhr.mapper.HrRoleMapper;
import com.xpf.vhr.model.Hr;
import com.xpf.vhr.utils.HrUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HrService implements UserDetailsService{
	@Autowired
	HrMapper hrMapper;
	@Autowired
	HrRoleMapper hrRoleMapper;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Hr hr = hrMapper.loadUserByUsername(username);
		if (hr == null) {
			throw new UsernameNotFoundException("用户名不存在");
		}
		hr.setRoles(hrMapper.getHrRolesById(hr.getId()));
		return hr;
	}

	public List<Hr> getAllHrs(String keyword) {
		return hrMapper.getAllHrs(HrUtils.getCurrentHr().getId(),keyword);
	}


	public Integer updateHr(Hr hr) {

		return hrMapper.updateByPrimaryKeySelective(hr);
	}

	@Transactional
	public boolean updateHrRole(Integer hrid, Integer[] rids) {
		hrRoleMapper.deleteHrid(hrid);
		return hrRoleMapper.addRole(hrid,rids) == rids.length;
	}


	public Integer deleteRole(Integer id) {
		return hrMapper.deleteByPrimaryKey(id);
	}

	public List<Hr> getAllHrsExceptCurrentHr() {
		return hrMapper.getAllHrsExceptCurrentHr(HrUtils.getCurrentHr().getId());
	}
}
