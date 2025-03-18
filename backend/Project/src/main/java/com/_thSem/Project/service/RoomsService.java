package com._thSem.Project.service;

import com._thSem.Project.repository.RoomsRepository;
import org.apache.catalina.LifecycleState;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomsService {
    private final RoomsRepository repository;

    public RoomsService(RoomsRepository repository) {
        this.repository = repository;
    }
    public List<String> getfreerooms(String day,Integer slot){
        List<String> L1=new ArrayList<>();
        for(int i=1;i<=30;i++){
            String n1=String.valueOf(i);
            String room="L";
            if(repository.findByDayAndSlotAndRoomAndNumber(day,slot,room,i).isPresent()){

            }
            else{
                L1.add(room+n1);
            }


        }
        for(int i=1;i<=10;i++){
            String n1=String.valueOf(i);
            String room="T";
            if(repository.findByDayAndSlotAndRoomAndNumber(day,slot,room,i).isPresent()){

            }
            else{
                L1.add(room+n1);
            }


        }
        return L1;
    }
}
