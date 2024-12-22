import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonModal,
} from '@ionic/react';
import {
  CheckCircle,
  Grid,
  List,
  Users,
  XCircle,
  Check,
  X,
  Calendar,
} from 'lucide-react';
import { getStudentsApi } from '../../app/API/StudentsAPI';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  isPresent: boolean;
}

const AttendancePage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', rollNumber: 'A001', isPresent: false },
    { id: '2', name: 'Jane Smith', rollNumber: 'B002', isPresent: false },
    { id: '3', name: 'Mike Johnson', rollNumber: 'C003', isPresent: false },
    { id: '4', name: 'Sarah Williams', rollNumber: 'D004', isPresent: false },
    { id: '5', name: 'Emily Brown', rollNumber: 'E005', isPresent: false },
    { id: '6', name: 'David Lee', rollNumber: 'F006', isPresent: false },
    { id: '7', name: 'Anna Wilson', rollNumber: 'G007', isPresent: false },
    { id: '8', name: 'Chris Taylor', rollNumber: 'H008', isPresent: false },
  ]);

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalContent, setModalContent] = useState<{
    present: Student[];
    absent: Student[];
  }>({
    present: [],
    absent: [],
  });

  const getStudents = () => {
    getStudentsApi().then(data => {
      console.log(data);
      // setStudents(data);
    });
  };

  useEffect(() => {
    // getStudents();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const toggleStudentAttendance = (studentId: string) => {
    setStudents(
      students.map(student =>
        student.id === studentId
          ? { ...student, isPresent: !student.isPresent }
          : student,
      ),
    );
  };

  const submitAttendance = () => {
    const presentStudents = students.filter(student => student.isPresent);
    const absentStudents = students.filter(student => !student.isPresent);

    setModalContent({ present: presentStudents, absent: absentStudents });
    setShowModal(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderGridView = () => (
    <div className="grid grid-cols-4 gap-3 p-2 pb-48">
      {students.map(student => (
        <div
          key={student.id}
          className={`
            p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 
            flex flex-col items-center justify-center space-y-2
            ${
              student.isPresent
                ? 'bg-emerald-700 text-emerald-50 shadow-lg scale-105'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:scale-105'
            }
          `}
          onClick={() => toggleStudentAttendance(student.id)}
        >
          <span className="font-bold text-lg">{student.rollNumber}</span>
          {student.isPresent ? (
            <CheckCircle size={24} className="text-emerald-200" />
          ) : (
            <XCircle size={24} className="text-neutral-500" />
          )}
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4 p-2 pb-48">
      {students.map(student => (
        <div
          key={student.id}
          className={`
            flex justify-between items-center p-4 rounded-xl transition-all duration-300
            ${
              student.isPresent
                ? 'bg-emerald-900/40 border-l-4 border-emerald-500'
                : 'bg-neutral-900/30 border-l-4 border-neutral-600'
            }
          `}
        >
          <div>
            <div className="font-semibold text-neutral-100">{student.name}</div>
            <div className="text-sm text-neutral-400">{student.rollNumber}</div>
          </div>
          <div
            className={`
              w-10 h-10 rounded-full cursor-pointer flex items-center justify-center
              ${
                student.isPresent
                  ? 'bg-emerald-600 text-emerald-100'
                  : 'bg-neutral-700 text-neutral-300'
              }
            `}
            onClick={() => toggleStudentAttendance(student.id)}
          >
            {student.isPresent ? <Check size={20} /> : <X size={20} />}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <IonPage className="bg-neutral-900">
      <IonHeader>
        <IonToolbar className="bg-neutral-800">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" color="dark" />
          </IonButtons>
          <IonTitle className="flex items-center space-x-3 text-neutral-100">
            Attendance
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-neutral-300">
              <Calendar size={20} />
              <span className="text-sm">{formatDate(currentDate)}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-emerald-700 text-emerald-100' : 'hover:bg-neutral-800'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-emerald-700 text-emerald-100' : 'hover:bg-neutral-800'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? renderGridView() : renderListView()}
        </div>

        {/* Fixed bottom buttons container */}
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 p-4 border-t border-neutral-800 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-emerald-800 text-emerald-100 p-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-emerald-700 transition"
              onClick={() =>
                setStudents(students.map(s => ({ ...s, isPresent: true })))
              }
            >
              <CheckCircle size={20} />
              <span>Mark All Present</span>
            </button>
            <button
              className="bg-rose-800 text-rose-100 p-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-rose-700 transition"
              onClick={() =>
                setStudents(students.map(s => ({ ...s, isPresent: false })))
              }
            >
              <XCircle size={20} />
              <span>Clear All</span>
            </button>
          </div>

          <button
            className="w-full mt-4 bg-emerald-800 text-emerald-100 p-3 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center space-x-2"
            onClick={submitAttendance}
          >
            <Check size={20} />
            <span>Submit Attendance</span>
          </button>
        </div>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <div className="p-6 bg-neutral-800 rounded-xl shadow-2xl max-w-md w-full mx-auto text-neutral-100">
            <h2 className="text-2xl font-bold mb-4 text-center text-emerald-500">
              Attendance Summary
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-500 flex items-center space-x-2">
                  <CheckCircle size={20} />
                  <span>Present Students ({modalContent.present.length})</span>
                </h3>
                <ul className="pl-6 list-disc text-neutral-300">
                  {modalContent.present.map(student => (
                    <li key={student.id}>{student.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-rose-500 flex items-center space-x-2">
                  <XCircle size={20} />
                  <span>Absent Students ({modalContent.absent.length})</span>
                </h3>
                <ul className="pl-6 list-disc text-neutral-300">
                  {modalContent.absent.map(student => (
                    <li key={student.id}>{student.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="w-full mt-6 bg-emerald-800 text-emerald-100 p-3 rounded-lg hover:bg-emerald-700 transition"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default AttendancePage;
