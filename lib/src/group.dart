import 'package:splitto/src/member.dart';
import 'package:splitto/src/payment_item.dart';

class Group {
  final List<Member> members;
  final List<PaymentItem> payments = [];

  Group(this.members) : assert(members.isNotEmpty, 'members cannot be empty') {
    final uniqMemberNames = members.map((item) => item.name).toSet();
    if (uniqMemberNames.length < members.length) {
      throw ArgumentError.value(
          members, 'members', 'two or more members have the same name');
    }
  }

  PaymentItem addPayment(double amount, Member payer) {
    final item = PaymentItem(amount, payer, members);
    payments.add(item);
    return item;
  }

  bool removePayment(PaymentItem item) {
    return payments.remove(item);
  }

  double get totalAmount => payments.fold(0, (sum, item) => sum + item.amount);

  double amountOf(Member member) {
    return payments
        .where((item) => item.payer == member)
        .fold(0, (sum, item) => sum + item.amount);
  }

  double debitOf(Member member) {
    return payments
        .where(
            (item) => item.payer != member && item.borrowers.contains(member))
        .fold(0, (sum, item) => sum + item.quotaOf(member));
  }

  double creditOf(Member member) {
    return payments.where((item) => item.payer == member).fold(
        0,
        (sum, item) =>
            sum +
            item.borrowers
                .where((borrower) => borrower != member)
                .fold(0, (sum, borrower) => sum + item.quotaOf(borrower)));
  }
}
