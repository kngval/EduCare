export type RoomType = {
  id: number;
  roomCode: string;
  subjectName: string;
  teacherName : string;
};

export type TFetchRoomsNonAdmin = {
  id : number;
  roomId : number;
  studentId : number;
  room :  {
    subjectName : string;
    teacherName : string;
    roomCode : string;
  }
}

export type TRoomDetails = {
  id : number,
  roomCode : string,
  subjectName : string,
  teacherId : number | null,
  teacherName : string | null
}

export type TFetchRoomStudents = {
  id : number,
  email : string,
  grade : number | null,
  role : string,
  userInfo : {
    firstName : string,
    lastName : string,
    age : number,
    gender : string,
    phone : string,
    lrn : string,
    country : string,
    city: string,
    state : string
  }

}
