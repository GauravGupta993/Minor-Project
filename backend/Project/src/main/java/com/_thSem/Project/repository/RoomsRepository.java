package com._thSem.Project.repository;

import com._thSem.Project.entity.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface RoomsRepository extends JpaRepository<Rooms,Integer> {

    Optional<Rooms> findByDayAndSlotAndRoomAndNumber(String day,Integer slot,String room,Integer number);

    @Override
    void deleteById(Integer integer);
}
