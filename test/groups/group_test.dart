import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/member.dart';
import 'package:splitto/src/payment_item/payment_item.dart';

void main() {
  test('should throw if name is empty', () {
    expect(() => Group('', []), throwsAssertionError);
  });

  test('should throw if name is spaces only', () {
    expect(() => Group('   ', []), throwsAssertionError);
  });

  test('should have a name', () {
    final group = Group('some name', [Member('me')]);
    expect(group.name, equals('some name'));
  });

  test('should throw if member list is empty', () {
    expect(() => Group('a name', []), throwsAssertionError);
  });

  test('should take one member', () {
    final members = [Member('name')];
    final group = Group('name', members);
    expect(group.members, equals(members));
  });

  test('should take multiple members', () {
    final members = [Member('name'), Member('name2')];
    final group = Group('name', members);
    expect(group.members, equals(members));
  });

  test('should throw if two members have the same name', () {
    final members = [Member('name'), Member('other name'), Member('name')];
    expect(() => Group('name', members), throwsArgumentError);
  });

  test(
      'should add a payment for a member with all members as borrowers by default (payer included)',
      () {
    final payer = Member('payer');
    final borrowers = [Member('borrower 1'), Member('borrower 2')];
    final members = [...borrowers, payer];
    final group = Group('name', [...borrowers, payer]);
    final item = group.addPayment(42, payer);
    expect(item.amount, equals(42));
    expect(item.payer, equals(payer));
    expect(item.borrowers, equals(members));
    expect(group.payments, hasLength(1));
    expect(group.payments[0], equals(item));
  });

  test('should remove a payment', () {
    final payer = Member('payer');
    final borrowers = [Member('borrower 1'), Member('borrower 2')];
    final group = Group('name', [...borrowers, payer]);
    final item = group.addPayment(42, payer);
    final result = group.removePayment(item);
    expect(result, isTrue);
    expect(group.payments, hasLength(0));
  });

  test('should return false if payment to remove does not exists', () {
    final payer = Member('payer');
    final borrowers = [Member('borrower 1'), Member('borrower 2')];
    final group = Group('name', [...borrowers, payer]);
    group.addPayment(42, payer);
    final result = group.removePayment(PaymentItem(42, payer, borrowers));
    expect(result, isFalse);
    expect(group.payments, hasLength(1));
  });

  test('total amout should be the sum of the payments', () {
    final member1 = Member('member 1');
    final member2 = Member('member 2');
    final member3 = Member('member 3');
    final group = Group('name', [member1, member2, member3]);
    group.addPayment(42, member1);
    group.addPayment(50.2, member2);
    group.addPayment(1.75, member1);
    expect(group.totalAmount, equals(93.95));
  });

  test('amout of a member should be the sum of payments for that member', () {
    final member1 = Member('member 1');
    final member2 = Member('member 2');
    final member3 = Member('member 3');
    final group = Group('name', [member1, member2, member3]);
    group.addPayment(42, member1);
    group.addPayment(50.2, member2);
    group.addPayment(1.75, member1);
    expect(group.amountOf(member1), equals(43.75));
  });

  test(
      'debit of a member should be the sum of the quota of all payments for which that member is borrower and not payer',
      () {
    final member1 = Member('member 1');
    final member2 = Member('member 2');
    final member3 = Member('member 3');
    final group = Group('name', [member1, member2, member3]);
    group.addPayment(42, member1); // quota 14
    group.addPayment(50.2, member2); // quota 16.7333...
    group.addPayment(1.75, member1); // quota 0.58333...
    group.addPayment(25, member2).borrowers = [member2, member3]; // quota 12.5
    expect(group.debitOf(member1), equals(16.74));
    expect(group.debitOf(member2), equals(14.59));
    expect(group.debitOf(member3), equals(43.82));
  });

  test(
      'credit of a member should be the sum of payments for which that member is the payer without its quotas',
      () {
    final member1 = Member('member 1');
    final member2 = Member('member 2');
    final member3 = Member('member 3');
    final group = Group('name', [member1, member2, member3]);
    group.addPayment(42, member1);
    group.addPayment(50.2, member2);
    group.addPayment(1.75, member1);
    expect(group.creditOf(member1), equals(29.18));
    expect(group.creditOf(member2), equals(33.47));
    expect(group.creditOf(member3), equals(0));
  });
}
