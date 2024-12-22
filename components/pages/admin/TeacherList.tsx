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
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import {
  UserPlus,
  Phone,
  Book,
  Mail,
  Lock,
  User,
  Search,
} from 'lucide-react';
import { addOutline } from 'ionicons/icons';

interface Teacher {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
}

const TeacherManagementPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      phone: '+1-234-567-8901',
      email: 'sarah.wilson@school.com',
      subject: 'Mathematics',
    },
    {
      id: '2',
      name: 'Prof. James Miller',
      phone: '+1-234-567-8902',
      email: 'james.miller@school.com',
      subject: 'Physics',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    password: '',
  });

  const handleAddTeacher = () => {
    const teacher: Teacher = {
      id: (teachers.length + 1).toString(),
      name: newTeacher.name,
      phone: newTeacher.phone,
      email: newTeacher.email,
      subject: newTeacher.subject,
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher({ name: '', phone: '', email: '', subject: '', password: '' });
    setShowAddModal(false);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <IonPage className="bg-neutral-900">
      <IonHeader>
        <IonToolbar className="bg-neutral-800">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin/home" color="dark" />
          </IonButtons>
          <IonTitle className="text-neutral-100">Teacher Management</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4">
          {/* Search and Add Teacher Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search teachers..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 text-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

          </div>

          {/* Teacher List */}
          <div className="space-y-4 pb-4">
            {filteredTeachers.map(teacher => (
              <div
                key={teacher.id}
                className="bg-neutral-800 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-100">{teacher.name}</h3>
                      <p className="text-blue-400">{teacher.subject}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-neutral-300">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>{teacher.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Teacher Modal */}
        <IonModal isOpen={showAddModal} onDidDismiss={() => setShowAddModal(false)}>
          <div className="p-6 bg-neutral-800 text-neutral-100">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Teacher</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full p-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full p-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-2 bg-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTeacher.password}
                  onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                className="w-full p-3 bg-neutral-600 text-neutral-100 rounded-lg hover:bg-neutral-500 transition"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleAddTeacher}
              >
                Add Teacher
              </button>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TeacherManagementPage;