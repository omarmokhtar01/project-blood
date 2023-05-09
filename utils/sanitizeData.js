// to return specific data
exports.sanitizeUserLogin = function (user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    nationalID: user.nationalID,
    birthDate: user.birthDate,
    bloodType: user.bloodType,
    location: user.location,
  };
};

exports.sanitizeUserSignup = function (user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    nationalID: user.nationalID,
    birthDate: user.birthDate,
    bloodType: user.bloodType,
    location: user.location,
  };
};

exports.sanitizeUserProfile = function (user) {
  return {
    name: user.name,
    phone: user.phone,
    location: user.location,
    birthDate: user.birthDate,
    nationalID: user.nationalID,
    bloodType: user.bloodType
  };
};
