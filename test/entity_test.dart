import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/entity.dart';

void main() {
  test('should start without debts', () {
    final entity = Entity();
    expect(entity.debts, hasLength(0));
  });

  test('should add debt', () {
    final entity = Entity();
    entity.addDebt(10);
    expect(entity.debts, equals([10]));
  });

  test('should remove debt', () {
    final entity = Entity();
    entity.addDebt(10);
    entity.removeDebt(10);
    expect(entity.debts, equals([]));
  });

  test('should not remove debits if given debit does not exist', () {
    final entity = Entity();
    entity.addDebt(10);
    entity.removeDebt(5);
    expect(entity.debts, equals([10]));
  });
  
  test('should start without credits', () {
    final entity = Entity();
    expect(entity.credits, hasLength(0));
  });

  test('should add credit', () {
    final entity = Entity();
    entity.addCredit(10);
    expect(entity.credits, equals([10]));
  });

  test('should remove credit', () {
    final entity = Entity();
    entity.removeCredit(10);
    expect(entity.credits, equals([]));
  });

  test('should not remove credits if given credit does not exist', () {
    final entity = Entity();
    entity.addCredit(10);
    entity.removeCredit(5);
    expect(entity.credits, equals([10]));
  });

}