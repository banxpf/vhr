package com.xpf.vhr.mapper;

import com.xpf.vhr.model.Nation;

import java.util.List;

public interface NationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Nation record);

    int insertSelective(Nation record);

    Nation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Nation record);

    int updateByPrimaryKey(Nation record);

	List<Nation> getAllNations();
}