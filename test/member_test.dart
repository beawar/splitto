import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/member.dart';

void main() {
  test('should throw if empty name is set', () {
    expect(() => Member(''), throwsArgumentError);
  });

  test('should throw if name is spaces only', () {
    expect(() => Member(''), throwsArgumentError);
  });

  test('should take a name', () {
    final member = Member('a name');
    expect(member.name, 'a name');
  });
}
