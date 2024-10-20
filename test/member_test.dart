import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/member.dart';
import 'package:splitto/src/payment_item.dart';

void main() {
  test('should start without debts', () {
    final member = Member();
    expect(member.debts, equals(0));
  });

  test('should start without credits', () {
    final member = Member();
    expect(member.credits, equals(0));
  });

  test('should have a list of payments', () {
    final member = Member();
    expect(member.payments, hasLength(0));
  });

  test('should add a payment', () {
    final member = Member();
    final item = PaymentItem(13.5);
    member.addPayment(item);
    expect(member.payments, equals([item]));
  });

  test('should remove a payment', () {
    final member = Member();
    final item = PaymentItem(13.5);
    member.addPayment(item);
    member.removePayment(item);
    expect(member.payments, equals([]));
  });
}
