package com._thSem.Project.repository;

import com._thSem.Project.entity.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomsRepository extends JpaRepository<Rooms,Integer> {
    @Override
    Optional<Rooms> findAllByDayAndAndSlotAndAndRoomAndAndRoom(Integer integer);
}
