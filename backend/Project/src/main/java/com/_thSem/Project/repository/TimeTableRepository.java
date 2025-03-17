package com._thSem.Project.repository;

import com._thSem.Project.entity.TimeTable;
import com._thSem.Project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;

@Repository
public interface TimeTableRepository extends JpaRepository<TimeTable,Integer> {
   // List<TimeTable> findAllBy(User user);
    TimeTable findTimeTableByDayAndUserAndSlot(String day,User user,Integer slot);
    List<TimeTable> findAllByDayAndUser(String day,User user);
}
