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
