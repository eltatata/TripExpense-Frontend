import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Packages.css";
import CreatePackageModal from "../../components/modals/CreatePackageModal";
import EditPackageModal from "../../components/modals/EditPackageModal";
import ConfirmModal from "../../components/modals/ConfirmModal";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [packageToEdit, setPackageToEdit] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get("/packages");
        const dataArray = Array.isArray(res.data) ? res.data : res.data.data;
        setPackages(dataArray || []);
      } catch (error) {
        console.error("Error al obtener paquetes:", error);
        setPackages([]);
      }
    };

    fetchPackages();
  }, []);

  const handleCreate = (newPackage) => {
    setPackages([...packages, newPackage]);
    setCreateModalOpen(false);
  };

  const handleEdit = (updatedPackage) => {
    const updatedPackages = packages.map((pkg) =>
      pkg.id === updatedPackage.id ? updatedPackage : pkg
    );
    setPackages(updatedPackages);
    setEditModalOpen(false);
    setPackageToEdit(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/packages/${packageToDelete}`);
      setPackages(packages.filter((pkg) => pkg.id !== packageToDelete));
      setDeleteModalOpen(false);
      setPackageToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el paquete:", error);
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="packages-container">
      <div className="packages-header">
        <h2 className="packages-title">Gestión de Paquetes</h2>
        <button className="create-button" onClick={() => setCreateModalOpen(true)}>
          Crear paquete
        </button>
      </div>

      <div className="cards-wrapper">
        {packages.length === 0 ? (
          <p className="no-packages-message">No hay paquetes disponibles</p>
        ) : (
          packages.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <img
                src={pkg.image || "https://via.placeholder.com/300"}
                alt={pkg.name}
                className="package-image"
              />
              <div className="package-info">
                <h3>{pkg.name}</h3>
                <p><strong>Destino:</strong> {pkg.destination}</p>
                <p><strong>Precio:</strong> {pkg.pricePerPerson}</p>
                <p><strong>Tipo:</strong> {pkg.type}</p>

                {expandedCard === pkg.id && (
                  <div className="extra-info">
                    <p><strong>Descripción:</strong> {pkg.description}</p>
                    <p><strong>Duración:</strong> {pkg.durationDays} días</p>
                    <p><strong>Hotel:</strong> {pkg.hotel}</p>
                    <p><strong>Vuelo:</strong> {pkg.flight}</p>
                    <p><strong>Actividades:</strong></p>
                    <ul className="activities-list">
                      {pkg.activities?.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="action-buttons">
                  <button className="toggle-button" onClick={() => toggleExpand(pkg.id)}>
                    {expandedCard === pkg.id ? "Ocultar" : "Ver más"}
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setPackageToEdit(pkg);
                      setEditModalOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => {
                      setPackageToDelete(pkg.id);
                      setDeleteModalOpen(true);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <CreatePackageModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EditPackageModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleEdit}
        packageToEdit={packageToEdit}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="¿Eliminar paquete?"
        description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar este paquete?"
      />
    </div>
  );
};

export default Packages;
