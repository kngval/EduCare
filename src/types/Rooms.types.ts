export type RoomType = {
  id: number;
  roomCode: string;
  subjectName: string;
  teacherName : string;
};

export type TRoomDetails = {
  id : number,
  roomCode : string,
  subjectName : string,
  teacherId : number | null,
  teacherName : string | null
}
