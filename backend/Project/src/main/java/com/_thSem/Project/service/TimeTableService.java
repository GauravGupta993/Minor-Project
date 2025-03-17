package com._thSem.Project.service;

import com._thSem.Project.entity.TimeTable;
import com._thSem.Project.entity.User;
import com._thSem.Project.model.Slot;
import com._thSem.Project.model.TimeTableUpdateRequest;
import com._thSem.Project.repository.TimeTableRepository;
import com._thSem.Project.repository.UserRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Getter
@Setter
@RequiredArgsConstructor

//@RequiredArgsConstructor

public class TimeTableService {
//    private TimeTableService(UserService userService, UserRepository userRepository, TimeTableRepository timeTableRepository) {
//        this.userService = userService;
//        this.userRepository = userRepository;
//        this.timeTableRepository = timeTableRepository;
//    }

    private    UserService userService;
    private  UserRepository userRepository;
    private  TimeTableRepository timeTableRepository;
    public  void update(String email, TimeTableUpdateRequest table){
        User user=userRepository.findByEmail(email).get();
            for(Slot s: table.Slots){
                 if(s.getHasClass()){
                     TimeTable timeTable=timeTableRepository.findTimeTableByDayAndUserAndSlot(table.getDay(),user,s.slot);
                     timeTable.setRoom(s.getRoom());
                     timeTable.setHasClass(true);
                     timeTableRepository.save(timeTable);
                 }
                 else{
                     TimeTable timeTable=timeTableRepository.findTimeTableByDayAndUserAndSlot(table.getDay(),user,s.slot);
                     timeTable.setRoom("NULL");
                     timeTable.setHasClass(false);
                     timeTableRepository.save(timeTable);
                 }
            }
    }
    public TimeTableUpdateRequest getTimeTable(String email,String Day){
        TimeTableUpdateRequest timeTableUpdateRequest=new TimeTableUpdateRequest();
        timeTableUpdateRequest.setDay(Day);
        User user=userRepository.findByEmail(email).get();
        List<TimeTable> timeTables=timeTableRepository.findAllByDayAndUser(Day,user);
        List<Slot>l1 = new ArrayList<>();
        for(TimeTable t1:timeTables){
            Slot slot=new Slot();
            slot.setRoom(t1.getRoom());
            slot.setHasClass(t1.getHasClass());
            slot.setSlot(t1.getSlot());
            l1.add(slot);
        }
        timeTableUpdateRequest.setSlots(l1);
        return timeTableUpdateRequest;



    }
    public TimeTableUpdateRequest getFreeSlot(String email){
        TimeTableUpdateRequest timeTableUpdateRequest=new TimeTableUpdateRequest();
        List<String> weekDays = new ArrayList<>();
        User user=userRepository.findByEmail(email).get();


        // Adding days of the week to the list
        weekDays.add("Monday");
        weekDays.add("Tuesday");
        weekDays.add("Wednesday");
        weekDays.add("Thursday");
        weekDays.add("Friday");
        LocalDate today = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        int currentHour = currentTime.getHour();

        // Get the current day of the week
        DayOfWeek dayOfWeek = today.getDayOfWeek();

        // Convert the enum value to a capitalized string (e.g., "Monday")
        String dayString = dayOfWeek.toString(); // This gives "MONDAY"
        String capitalizedDay = dayString.substring(0, 1) + dayString.substring(1).toLowerCase();
        int a=0;
        for(int i=0;i<5;i++){
            if(weekDays.get(i)==capitalizedDay){
                a=i;
                break;
            }

        }
        Boolean found =false;
        if(currentHour<8){


        }
        else if(currentHour>17){
            a++;


        }
        else{
            int temp=currentHour-8;
            for(int i=temp+2;i<=8;i++){
                if(!timeTableRepository.findTimeTableByDayAndUserAndSlot(weekDays.get(a),user,i).getHasClass()){
                    timeTableUpdateRequest.setDay(weekDays.get(a));
                    List<Slot> slot = new ArrayList<>();
                    Slot s1=new Slot();
                    s1.setSlot(i);
                    timeTableUpdateRequest.setSlots(slot);
                    return timeTableUpdateRequest;


                }

            }
            a++;



        }
        a%=5;
        while(true){

            for(int i=1;i<=8;i++){
                if(!timeTableRepository.findTimeTableByDayAndUserAndSlot(weekDays.get(a),user,i).getHasClass()){
                    timeTableUpdateRequest.setDay(weekDays.get(a));
                    List<Slot> slot = new ArrayList<>();
                    Slot s1=new Slot();
                    s1.setSlot(i);
                    timeTableUpdateRequest.setSlots(slot);
                    return timeTableUpdateRequest;


                }

            }

            a++;
            a%=5;
        }




    }
    public  void createTimeTable(User user){
        List<String> weekDays = new ArrayList<>();
        // Adding days of the week to the list
        weekDays.add("Monday");
        weekDays.add("Tuesday");
        weekDays.add("Wednesday");
        weekDays.add("Thursday");
        weekDays.add("Friday");
        for(int i=0;i<5;i++){
            for(int j=1;j<=8;i++){
                TimeTable t1=new TimeTable();
                t1.setDay(weekDays.get(i));
                t1.setHasClass(false);
                t1.setSlot(j);
                t1.setUser(user);
                t1.setRoom("Null");
                timeTableRepository.save(t1);

            }
        }

    }



}
