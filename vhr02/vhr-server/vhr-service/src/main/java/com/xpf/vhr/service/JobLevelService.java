package com.xpf.vhr.service;

import com.xpf.vhr.mapper.JobLevelMapper;
import com.xpf.vhr.model.JobLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class JobLevelService {
	@Autowired
	JobLevelMapper jobLevelMapper;

	public List<JobLevel> getAllJobLevels() {
		return jobLevelMapper.getAllJobLevels();
	}

	public Integer addJobLevel(JobLevel jobLevel) {
		jobLevel.setCreateDate(new Date());
		jobLevel.setEnabled(true);
		return jobLevelMapper.insertSelective(jobLevel);
	}

	public Integer updateJobLevel(JobLevel jobLevel) {
		return jobLevelMapper.updateByPrimaryKeySelective(jobLevel);
	}

	public Integer deleteJobLevelById(Integer id) {
		return jobLevelMapper.deleteByPrimaryKey(id);
	}

	public Integer deleteJobLevelsByIds(Integer[] ids) {
		return  jobLevelMapper.deleteJobLevelsByIds(ids);
	}
}
