const SharedProfile = ({ name, bio, avatarUrl }) => {
  return (
    <div className="p-8">
      <img
        src="https://images.unsplash.com/photo-1588538452449-5d621cd1be51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
        alt={`${name}'s avatar`}
        className="rounded-full h-32 w-32 fit mb-4"
      />
      <h1 className="text-2xl font-bold text-center mb-2">{name}</h1>
      <p className="text-gray-600 text-center">{bio}</p>
    </div>
  );
};

export default SharedProfile;
