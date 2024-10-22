import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/member.dart';
import 'package:splitto/src/payment_item/payment_item.dart';

void main() {
  test('should set an amout', () {
    final payer = Member('name');
    final item = PaymentItem(34, payer);
    expect(item.amount, equals(34));
  });

  test('should set the payer', () {
    final payer = Member('name');
    final item = PaymentItem(34, payer);
    expect(item.payer, payer);
  });

  test('should set the borrowers', () {
    final payer = Member('name');
    final borrowers = [Member('name 1'), Member('name 2'), Member('name 3')];
    final item = PaymentItem(34, payer, borrowers);
    expect(item.borrowers, equals(borrowers));
  });

  test('quota of a borrower should be the amout divided between all borrowers',
      () {
    final payer = Member('name');
    final borrowers = [Member('name 1'), Member('name 2'), Member('name 3')];
    final item = PaymentItem(33, payer, borrowers);
    expect(item.quotaOf(borrowers[0]), equals(11));
  });

  test('quota of a member that is not a borrower should be 0', () {
    final payer = Member('name');
    final borrowers = [Member('name 1'), Member('name 2'), Member('name 3')];
    final item = PaymentItem(50, payer, borrowers);
    expect(item.quotaOf(Member('name 4')), equals(0));
  });

  test('quota (50.2 / 3) should be rounded to 2 decimals and payer should pay less if it is also a borrower', () {
    final member1 = Member('name 1');
    final member2 = Member('name 2');
    final member3 = Member('name 3');
    final item = PaymentItem(50.2, member1, [member1, member2, member3]);
    expect(item.quotaOf(member1), equals(16.73));
    expect(item.quotaOf(member2), equals(16.74));
    expect(item.quotaOf(member3), equals(16.73));
  });

  test('quota (50.2 / 3) should be rounded to 2 decimals and difference should be spread on borrowers from first to last', () {
    final member1 = Member('name 1');
    final member2 = Member('name 2');
    final member3 = Member('name 3');
    final member4 = Member('name 4');
    final item = PaymentItem(50.2, member4, [member1, member2, member3]);
    expect(item.quotaOf(member1), equals(16.74));
    expect(item.quotaOf(member2), equals(16.73));
    expect(item.quotaOf(member3), equals(16.73));
  });

  test('quota (50.3 / 3) should be rounded to 2 decimals and difference should be spread on borrowers from first to last', () {
    final member1 = Member('name 1');
    final member2 = Member('name 2');
    final member3 = Member('name 3');
    final member4 = Member('name 4');
    final item = PaymentItem(50.3, member4, [member1, member2, member3]);
    expect(item.quotaOf(member1), equals(16.76));
    expect(item.quotaOf(member2), equals(16.77));
    expect(item.quotaOf(member3), equals(16.77));
  });

  test('quota (50.3 / 4) should be rounded to 2 decimals and difference should be spread on borrowers from first to last', () {
    final member1 = Member('name 1');
    final member2 = Member('name 2');
    final member3 = Member('name 3');
    final member4 = Member('name 4');
    final item = PaymentItem(50.3, member4, [member1, member2, member3, member4]);
    expect(item.quotaOf(member1), equals(12.58));
    expect(item.quotaOf(member2), equals(12.58));
    expect(item.quotaOf(member3), equals(12.57));
    expect(item.quotaOf(member3), equals(12.57));
  });
}
