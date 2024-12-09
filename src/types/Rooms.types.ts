export type RoomType = {
  id: number;
  roomCode: string;
  subjectName: string;
};

export type TRoomDetails = {
  id : number,
  roomCode : string,
  subjectName : string,
  teacherId : number | null,
  teacherName : string | null
}
