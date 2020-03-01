package com.xpf.vhr.controller.system.basic;

import com.xpf.vhr.model.JobLevel;
import com.xpf.vhr.model.RespBean;
import com.xpf.vhr.service.JobLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/basic")
public class JobLevelController {

	@Autowired
	JobLevelService jobLevelService;
	@GetMapping("/jobLevel")
	public List<JobLevel> getAllJobLevels() {
		return jobLevelService.getAllJobLevels();
	}
	@PostMapping("/jobLevel")
	public RespBean addJobLevel(@RequestBody JobLevel jobLevel) {
		if (jobLevelService.addJobLevel(jobLevel) == 1) {
			return RespBean.ok("添加成功!");
		}
		return RespBean.error("添加失败!");
	}

	@PutMapping("/jobLevel")
	public RespBean updateJobLevel(@RequestBody JobLevel jobLevel) {
		if (jobLevelService.updateJobLevel(jobLevel) == 1) {
			return RespBean.ok("修改成功！");
		}
		return RespBean.error("修改失败！");
	}

	@DeleteMapping("/jobLevel/{id}")
	public RespBean deleteJobLevelById(@PathVariable Integer id) {
		if (jobLevelService.deleteJobLevelById(id) == 1) {
			return RespBean.ok("删除成功！");
		}
		return RespBean.error("删除失败！");
	}
	@DeleteMapping("/jobLevel/many")
	public RespBean deleteJobLevelById(Integer[] ids) {
		if (jobLevelService.deleteJobLevelsByIds(ids) == ids.length) {
			return RespBean.ok("删除成功！");
		}
		return RespBean.error("删除失败！");
	}
}
