


const MemoryViewModal = ({ isOpen, onClose, memory, onEdit, onDelete, user }: any) => {
  if (!isOpen || !memory) return null;

  // Determine if this is the user's own memory
  let isOwnMemory = false;
  if (user && memory.userId) {
    if (typeof memory.userId === "object") {
      isOwnMemory = String(memory.userId._id || memory.userId.id) === String(user._id || user.id);
    } else {
      isOwnMemory = String(memory.userId) === String(user._id || user.id);
    }
  }

  // Get friend's name if not own memory
  let friendName = null;
  if (!isOwnMemory && memory.userId && typeof memory.userId === "object") {
    friendName = memory.userId.username || "Friend";
  }

  return (
    <div className="modal-overlay active" style={{ zIndex: 6000 }}>
      <div className="memory-view-window">
        <button className="close-modal-btn" onClick={onClose}>
          <i className="ph ph-x"></i>
        </button>

        <div className="view-header">
          <div className="view-date-badge">
            <i className="ph ph-calendar-blank"></i>
            <span>{memory.date || "Unknown Date"}</span>
          </div>
          {/* Only show actions if it's the user's own memory */}
          <div className="view-actions">
            {isOwnMemory ? (
              <>
                <button className="delete-btn" onClick={() => onDelete(memory._id || memory.id)} title="Delete Memory">
                  <i className="ph ph-trash"></i>
                </button>
                <button className="edit-btn" onClick={() => onEdit(memory)}>
                  <i className="ph ph-pencil-simple"></i> Edit
                </button>
              </>
            ) : (
              friendName && (
                <span className="friend-shared-label">Shared by <b>{friendName}</b></span>
              )
            )}
          </div>
        </div>

        <div className="view-content">
          <h2 className="view-title">{memory.title}</h2>
          
          <div className="view-location">
            <i className="ph ph-map-pin"></i>
            <span>{memory.location?.name || "Unknown Location"}</span>
          </div>

          {memory.images && memory.images.length > 0 && (
            <div className="view-gallery">
              {memory.images.map((img: any, index: any) => (
                <div key={index} className="view-image-container">
                  <img src={img} alt={`Memory ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          <div className="view-body">
            <div className="view-mood">
              <span className="mood-label">Mood:</span>
              <span className={`mood-tag ${memory.mood}`}>
                {memory.mood === "happy" && <i className="ph ph-smiley"></i>}
                {memory.mood === "adventurous" && <i className="ph ph-compass"></i>}
                {memory.mood === "peaceful" && <i className="ph ph-coffee"></i>}
                {memory.mood === "romantic" && <i className="ph ph-heart"></i>}
                {memory.mood?.charAt(0).toUpperCase() + memory.mood?.slice(1)}
              </span>
            </div>

            <div className="view-story">
              <p>{memory.story}</p>
            </div>

            {memory.tags && memory.tags.length > 0 && (
              <div className="view-tags">
                {memory.tags.map((tag: any, i: any) => (
                  <span key={i} className="tag-pill">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryViewModal;

