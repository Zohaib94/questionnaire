function isPalindrome(str) {
  if(!str || str.length == 0) {
    return true;
  }

  let sanitizedString = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let characterArray = sanitizedString.split('');
  let reverseCharacterArray = sanitizedString.split('').reverse();

  return (characterArray.every(function(character, index) {
    return (character == reverseCharacterArray[index]);
  }));
}
