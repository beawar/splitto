import 'package:splitto/src/member.dart';

class PaymentItem {
  double amount;
  Member payer;
  List<Member> _borrowers;
  List<double> _quotas = [];

  void _assignQuota() {
    if (_borrowers.isEmpty) {
      return;
    }

    final quota = double.parse((amount / _borrowers.length).toStringAsFixed(2));
    final difference = (amount * 100 - (quota * _borrowers.length) * 100) / 100;
    _quotas = List.filled(_borrowers.length, quota);
    final payerIndex = _borrowers.indexOf(payer);
    double membersInvolved = difference.abs() * 100;
    final additionalQuota = ((difference * 100) / membersInvolved) / 100;
    var index = 0;
    while (membersInvolved > 0) {
      if (index == payerIndex && additionalQuota > 0) {
        index += 1;
        continue;
      }
      _quotas[index] = double.parse((_quotas[index] + additionalQuota).toStringAsFixed(2));
      membersInvolved -= 1;
      index += 1;
    }

  }

  PaymentItem(this.amount, this.payer, [this._borrowers = const []]) {
    _assignQuota();
  }

  List<Member> get borrowers => _borrowers;

  set borrowers(List<Member> borrowers) {
    _borrowers = borrowers;
    _assignQuota();
  }

  double quotaOf(Member member) {
    final indexOfMember = _borrowers.indexOf(member);
    if (indexOfMember == -1) {
      return 0;
    }
    return _quotas[indexOfMember];
  }


}