import api from "../config/api";

export async function createClassroom(data) {
  return api.post(
    "/api/v1/classrooms",
    data
  );
}

export async function getTeacherClassrooms() {
  return api.get(
    "/api/v1/classrooms/teacher"
  );
}

export async function getStudentClassrooms() {
  return api.get(
    "/api/v1/classrooms/student"
  );
}

export async function joinClassroom(data) {
  return api.post(
    "/api/v1/classrooms/join",
    data
  );
}

export async function getClassroom(id) {
  return api.get(
    `/api/v1/classrooms/${encodeURIComponent(id)}`
  );
}

export async function leaveClassroom(id) {
  return api.post(
    `/api/v1/classrooms/${encodeURIComponent(id)}/leave`
  );
}

export async function removeStudent(
  classroomId,
  studentId
) {
  return api.delete(
    `/api/v1/classrooms/${encodeURIComponent(
      classroomId
    )}/students/${encodeURIComponent(studentId)}`
  );
}

const classroomService = {
  createClassroom,
  getTeacherClassrooms,
  getStudentClassrooms,
  joinClassroom,
  getClassroom,
  leaveClassroom,
  removeStudent,
};

export default classroomService;
